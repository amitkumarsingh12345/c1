import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import BackButton from "@/components/BackButton";

const LoginScreen = ({ navigation }) => {
  const [mobileNo, setMobileNo] = useState("");
  const [userType, setUserType] = useState("user");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!mobileNo) {
      Alert.alert("Error", "Please enter mobile number");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://capin.co.in/api_.php/login_verify",
        {
          user_type: userType,
          mobile_no: mobileNo,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.data) {
        // Navigate to home screen on successful login
        navigation.navigate("Home", { userData: response.data });
      } else {
        Alert.alert("Error", "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          {/* Back button */}
         <BackButton/>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.innerContainer}>

              <Text style={styles.title}>User Login</Text>

          {/* Logo Image */}
          <Image
            source={require("../assets/images/login-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Mobile Number Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter Mobile Number"
            keyboardType="phone-pad"
            value={mobileNo}
            onChangeText={setMobileNo}
            maxLength={10}
          />

          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>

          {/* Footer Text */}
          <Text style={styles.footerText}>
            Don't have an account?{" "}
            <Text
              style={styles.linkText}
              onPress={() => navigation.navigate("Register")}
            >
              Sign up
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding:10,
    paddingHorizontal:20,
  },
  logo: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 25,
    fontFamily: "PoppinsBold",
    color: "#045fa5",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    width: 300,
  },
  loginButton: {
    backgroundColor: "#045fa5",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: 300,
    marginTop: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontFamily: "PoppinsBold",
    fontSize: 16,
  },
  footerText: {
    textAlign: "center",
    color: "#666",
        fontFamily: "PoppinsRegular",
  },
  linkText: {
    color: "#4a90e2",
     fontFamily: "PoppinsBold",
  },
});

export default LoginScreen;
