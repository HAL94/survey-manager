import SurveyNavigation from "../../components/SurveyNavigation/SurveyNavigation";
import React from "react";
import { Outlet } from "react-router-dom";

export default function SurveyPage() {
  return (
    <React.Fragment>
      <SurveyNavigation />
      <Outlet />
    </React.Fragment>
  )
}
