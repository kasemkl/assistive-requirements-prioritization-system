import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import MyAreaChart from "./MyAreaChart";
import MyBarCharts from "./MyBarCharts";
import MyPieChart from "./MyPieChart";
import TopReq from "./TopReq";
import "../../styles/variables.css";
import { MDBSpinner } from "mdb-react-ui-kit";
import Loading from "../../ui/Loading";
import Dashboard from "./../../pages/productOwner/Dashboard";

const pieChartColors = [
  "var(--chart-color-3)",
  "var(--chart-color-6)",
  "var(--chart-color-7)",
];
const barChartColors = [
  "var(--chart-color-3)",
  "var(--chart-color-6)",
  "var(--chart-color-4)",
  "var(--chart-color-5)",
];
const areaChartColor = ["var(--chart-color-3)", "var(--chart-color-6)"];

function ProjectDashboard() {
  const param = useParams();
  const { project_title, project_id } = param;
  const api = useAxios();

  const fetchSentiments = async ({ queryKey }) => {
    const [_, project_id] = queryKey;
    const response = await api.get(`reviews-pie-chart/${project_id}`);
    return response.data;
  };

  const fetchArea = async ({ queryKey }) => {
    const [_, project_id] = queryKey;
    const response = await api.get(`reviews-area-chart/${project_id}`);
    return response.data;
  };

  const fetchReviewCount = async ({ queryKey }) => {
    const [_, project_id] = queryKey;
    const response = await api.get(`reviews-number/${project_id}`);
    return response.data;
  };

  const fetchTopReq = async ({ queryKey }) => {
    const [_, project_id] = queryKey;
    const response = await api.get(`top-5-req/${project_id}`);
    const data = response.data;
    data.top_positive_req = data.top_positive_req.map((req) => ({
      ...req,
      id: `Req-${req.id}`,
    }));
    data.top_negative_req = data.top_negative_req.map((req) => ({
      ...req,
      id: `Req-${req.id}`,
    }));
    data.top_total_req = data.top_total_req.map((req) => ({
      ...req,
      id: `Req-${req.id}`,
    }));
    return data;
  };

  const {
    data: sentiments,
    isLoading: loadingSentiments,
    error: errorSentiments,
  } = useQuery({
    queryKey: ["sentiments", project_id],
    queryFn: fetchSentiments,
  });

  const {
    data: reviewsPolarity,
    isLoading: loadingPolarity,
    error: errorPolarity,
  } = useQuery({
    queryKey: ["polarity", project_id],
    queryFn: fetchArea,
  });

  const {
    data: reviewsCount,
    isLoading: loadingCount,
    error: errorCount,
  } = useQuery({
    queryKey: ["count", project_id],
    queryFn: fetchReviewCount,
  });

  const {
    data: topReqs,
    isLoading: loadingReqs,
    error: errorReqs,
  } = useQuery({
    queryKey: ["topReq", project_id],
    queryFn: fetchTopReq,
  });

  console.log(sentiments);
  if (loadingSentiments || loadingPolarity || loadingCount || loadingReqs) {
    return <Loading />;
  }

  if (errorSentiments || errorPolarity || errorCount || errorReqs) {
    console.error(
      "Error loading data:",
      errorSentiments,
      errorPolarity,
      errorCount,
      errorReqs,
    );
    return <p>Error loading data. Please try again later.</p>;
  }

  const isAllDataEmpty =
    (!sentiments || sentiments.length === 0) &&
    (!reviewsPolarity || reviewsPolarity.length === 0) &&
    (!reviewsCount || !reviewsCount.reviews_number) &&
    (!topReqs ||
      (topReqs.top_positive_req.length === 0 &&
        topReqs.top_negative_req.length === 0 &&
        topReqs.top_total_req.length === 0));

  if (isAllDataEmpty) {
    return <p>No data available.</p>;
  }

  return (
    <div>
      <h2>Dashboard of {project_title}</h2>
      <div className="dashboard">
        <div className="charts">
          {reviewsPolarity.length > 0 && (
            <div className="area-chart chart">
              <MyAreaChart
                data={reviewsPolarity}
                name={"date"}
                value1={"positive_review"}
                value2={"negative_review"}
                colors={areaChartColor}
                width={800}
                height={300}
                labelText1={"Positive Reviews"}
                labelText2={"Negative Reviews"}
              />
            </div>
          )}
          {topReqs?.top_positive_req.length > 0 && (
            <div className="bar-chart chart">
              <MyBarCharts
                data={topReqs.top_positive_req}
                x={"id"}
                y={"positive_reviews_count"}
                y2={"negative_reviews_count"}
                color2={barChartColors[1]}
                color={barChartColors[0]}
                width={800}
                height={300}
                text={
                  "Top 10 Requirements With Higher Number Of Positive Reviews"
                }
                labelText1={"Positive Reviews"}
                labelText2={"Negative Reviews"}
              />
            </div>
          )}
          {topReqs?.top_negative_req.length > 0 && (
            <div className="bar-chart chart">
              <MyBarCharts
                data={topReqs.top_negative_req}
                x={"id"}
                y={"positive_reviews_count"}
                y2={"negative_reviews_count"}
                color2={barChartColors[1]}
                color={barChartColors[0]}
                width={800}
                height={300}
                text={
                  "Top 10 Requirements With Higher Number Of Negative Reviews"
                }
                labelText1={"Positive Reviews"}
                labelText2={"Negative Reviews"}
              />
            </div>
          )}
          {topReqs?.top_total_req.length > 0 && (
            <div className="bar-chart chart">
              <MyBarCharts
                data={topReqs.top_total_req}
                x={"id"}
                y={"positive_reviews_count"}
                y2={"negative_reviews_count"}
                color2={barChartColors[1]}
                color={barChartColors[0]}
                width={800}
                height={300}
                stack={true}
                text={
                  "Top 10 Requirements With Higher Number Of Positive And Negative Reviews"
                }
                labelText1={"Positive Reviews"}
                labelText2={"Negative Reviews"}
              />
            </div>
          )}
        </div>
        <div className="charts-2">
          {reviewsCount?.reviews_number ? (
            <div className="reviews-count chart">
              <div className="reviews-number">
                <div className="reviews-icon">
                  <i className="bx bxs-comment-dots"></i>
                </div>
                <div>
                  <p className="text-reviews">Total Reviews</p>
                  <p className="number">
                    {reviewsCount.reviews_number.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
          {sentiments.length > 0 && (
            <div className="pie-chart chart">
              <MyPieChart
                data={sentiments}
                value={"value"}
                COLORS={pieChartColors}
                width={300}
                height={300}
              />
            </div>
          )}
          {topReqs?.top_positive_req.length > 0 && (
            <div className="top-req chart">
              <TopReq requirements={topReqs.top_positive_req} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectDashboard;
