import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

import { COLORS, SIZES } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import { useFetch } from "../../../hook/useFetch";
import styles from "./nearbyjobs.style";

const Nearbyjobs = () => {
  const { data, isLoading, error, refetch } = useFetch("search", {
    query: "Software Engineer",
    num_pages: 1,
  });

  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong!</Text>
        ) : (
          data?.map((item) => (
            <NearbyJobCard
              job={item}
              handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
              key={`nearby-job-${item.job_id}`}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
