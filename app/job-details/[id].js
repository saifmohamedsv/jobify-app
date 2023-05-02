import { Stack, useRouter, useSearchParams } from "expo-router";
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { COLORS, icons, SIZES } from "../../constants";
import { useFetch } from "../../hook/useFetch";
import {
  ScreenHeaderBtn,
  Company,
  JobTabs,
  Specifics,
  JobAbout,
  JobFooter,
} from "../../components";
import { useCallback, useState } from "react";

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
  const { id: job_id } = useSearchParams();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const { data, isLoading, error, refetch } = useFetch(`job-details`, {
    job_id,
    extended_publisher_details: "false",
  });

  const router = useRouter();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            title="Qualifications"
            points={data[0].job_highlights?.Qualifications ?? "N/A"}
          />
        );

      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            points={data[0].job_highlights?.Responsibilities ?? "N/A"}
          />
        );

      case "About":
        return (
          <JobAbout info={data[0]?.job_description ?? "No data provided"} />
        );

      default:
        return <></>;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerBackVisible: false,
          headerShadowVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimensions={"60%"}
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimensions={"60%"} />
          ),
        }}
      />

      <>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          {isLoading ? (
            <ActivityIndicator size={"large"} color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong!</Text>
          ) : data.length === 0 ? (
            <Text>No Data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>

        <JobFooter
          url={
            data[0]?.job_google_link ?? "https://careers.google.com/job/results"
          }
        />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
