import * as Yup from "yup";

export const eventManagementSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  eventType: Yup.string().oneOf(["Online", "In-Person"]).required(),
  location: Yup.string().when("eventType", {
    is: "In-Person",
    then: (schema) => schema.required("Location is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  eventLink: Yup.string().when("eventType", {
    is: "Online",
    then: (schema) => schema.required("Event link is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  startDateTime: Yup.date().required("Start date/time is required"),
  endDateTime: Yup.date()
    .required("End date/time is required")
    .min(Yup.ref("startDateTime"), "End time must be after start time"),
  category: Yup.string().required("Category is required"),
});
