import React from "react";
//include all component
const Home = React.lazy(() => import("./views/Home/Home"));
const QuizTypes = React.lazy(() => import("./components/QuizTypes/QuizTypes"));
const Questions = React.lazy(() => import("./components/Questions/Questions"));

const routes = [
    { path: "/", exact: true, name: "Home", component: Home },
    { path: "/quizs", exact: true, name: "QuizTypes", component: QuizTypes },
    { path: "/questions/:quizTypeId", exact: true, name: "Questions", component: Questions }
];

export default routes;
