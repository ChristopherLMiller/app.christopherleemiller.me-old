import { useQuery } from "react-apollo";
import { ALERTS_QUERY } from "utils/queries";
import { Fragment, FunctionComponent } from "react";
import { isAfter } from "date-fns";
import { parseISO } from "date-fns";
import styled from "styled-components";

interface iStyledAlert {
  background: string;
}
const StyledAlert = styled.div<iStyledAlert>`
  padding: 20px;
  font-size: var(--p-responsive);
  background: var(--color-alert-${(props) => props.background});
`;

interface iAlerts {
  maxRenders: number;
}

const Alerts: FunctionComponent<iAlerts> = ({ maxRenders = 3 }) => {
  const { error, data } = useQuery(ALERTS_QUERY);

  // there was an error, log and return
  if (error) {
    console.error(`Unable to fetch any active alerts: ${error}`);
  }

  // Data was returned, determine if we need to show or not
  if (data) {
    // map over the data returned, checking against localstorage items
    return (
      <Fragment>
        {data.alerts.map((alert: any) => {
          // Here we determine if we should show the alert,
          // there are multiple steps to this.

          // Step 1)  Check that the date is before the valid till date
          //          and if not return null
          if (isAfter(new Date(), parseISO(alert.valid_till))) {
            return null;
          }

          // Step 2)  Now we attempt to get the localStorage item based on
          //          the ID of the alert.  Make sure we are client side
          if (process.browser) {
            const alertFromStorage =
              process.browser && localStorage.getItem(`alert_${alert.id}`);

            // Step 3)  Next we see if its defined
            if (alertFromStorage !== undefined && alertFromStorage) {
              // Step 3.a)  Item exists, parse the data into an array for further manipulation
              const alertStorageParsed = JSON.parse(alertFromStorage);

              // Step 3.b)  Compare the acknowledged_at to updated_at and see if
              //            its been updated since being viewed.  Return null if so.
              //            This is mainly to check if the alert was updated after last
              //            being acknowledged.
              if (
                isAfter(
                  parseISO(alertStorageParsed["acknowledged_at"]),
                  parseISO(alert.updated_at)
                )
              ) {
                return null;
              }

              // Step 3.c)  See if we have shown this at least 3 times, if so
              //            consider it acknowledged.  Don't render.
              if (alertStorageParsed["num_views"] >= maxRenders) {
                alertStorageParsed["acknowledged_at"] = new Date();
                localStorage.setItem(
                  `alert_${alert.id}`,
                  JSON.stringify(alertStorageParsed)
                );
                return null;
              }

              // Step 3.d)  If we have made it this far then we can assume now that
              //            the alert should be rendered.  Lets set some variables first.
              //            Note: This does not return anything as we need to continue
              //            to fall through to the render
              alertStorageParsed["num_views"] =
                alertStorageParsed["num_views"] + 1;
              localStorage.setItem(
                `alert_${alert.id}`,
                JSON.stringify(alertStorageParsed)
              );
            } else {
              // Step 3.a Alt) The alert didn't exist in the local storage so lets create it and set the viewed count to 1
              const alertItem = {
                num_views: 1,
              };
              const alertString = JSON.stringify(alertItem);
              localStorage.setItem(`alert_${alert.id}`, alertString);
            }
          } else {
            return null;
          }

          // Step 4)  We can render at this point
          return (
            <StyledAlert
              background={alert.color.toLowerCase()}
              key={alert.id}
              id={alert.id}
            >
              <h4>{alert.title}</h4>
              <p>{alert.description}</p>
            </StyledAlert>
          );
        })}
      </Fragment>
    );
  }

  // by default return null to avoid weird renders
  return null;
};

export { Alerts };
