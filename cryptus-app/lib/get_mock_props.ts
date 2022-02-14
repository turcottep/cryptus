import { profile_props } from "./data_types";
import props from "../public/turcotte";

export default function getMockProps(): profile_props {
  const mock_props = props as profile_props;
  return mock_props;
}
