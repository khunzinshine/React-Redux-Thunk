import { Label, Icon } from "semantic-ui-react";
import moment from "moment";

export const getStatusColor = (status) => {
  switch (status) {
    case "success":
    case "done":
    case "linked":
    case "active":
      return (
        <Label color="green" horizontal>
          {status}
        </Label>
      );
    case "failed":
    case "deleted":
    case "expired":
      return (
        <Label color="red" horizontal>
          {status}
        </Label>
      );
    case "pending":
    case "init":
      return (
        <Label color="orange" horizontal>
          {status}
        </Label>
      );
    case "resend":
    case "disputed":
    case "reversed":
      return (
        <Label color="yellow" horizontal>
          {status}
        </Label>
      );
    case "send":
    case "inProgress":
      return (
        <Label color="teal" horizontal>
          {status}
        </Label>
      );
    default:
      return (
        <Label color="grey" horizontal>
          {status}
        </Label>
      );
  }
};

export const getCheckImage = (renew) => {
  if (renew) {
    return <Icon name="check circle outline" color="green" />;
  } else {
    return <Icon name="times circle outline" color="red" />;
  }
};

export const checkDateFormat = (date) => {
  let checkDate = moment(date, moment.ISO_8601, true).isValid();
  return checkDate;
};

export const isLoading = (data) => (data ? false : true);

export const attributesCount = (count) =>
  count > 4 && count < 8 ? 2 : count > 8 ? 3 : 1;

export const attributesCols = (columnData) => (columnData > 4 ? 4 : columnData);

//format the total count
export const getTotalCountFormat = (totalCount) => {
  return totalCount.toLocaleString("en-US");
};
