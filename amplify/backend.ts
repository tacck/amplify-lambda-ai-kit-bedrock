import { defineBackend } from "@aws-amplify/backend";
import { data } from "./data/resource";
import { postOverview } from "./functions/post-overview/resource";

defineBackend({
  data,
  postOverview,
});
