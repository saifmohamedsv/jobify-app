import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Welcome,
  Popularjobs,
  ScreenHeaderBtn,
} from "../components";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimensions="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimensions="100%" />
          ),
          headerShadowVisible: false,
          title: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: SIZES.medium, flex: 1 }}>
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`);
              }
            }}
          />
          <Popularjobs searchTerm={searchTerm} />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
