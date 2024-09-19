import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: "p4woalw2",
  dataset: "production",
  apiVersion: "2022-03-07",
  useCdn: true,
});
