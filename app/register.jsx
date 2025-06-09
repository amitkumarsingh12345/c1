import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";

const SignupScreen = () => {
  const { signup } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    reg_sponser_id: "",
    reg_password: "",
    reg_mem_name: "",
    reg_sponser_name: "",
    reg_mobile: "",
    reg_email: "",
  });

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
    // Clear error when user types
    if (errors[key]) {
      setErrors({ ...errors, [key]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.reg_sponser_id.trim()) {
      newErrors.reg_sponser_id = "Sponsor ID is required";
    }

    if (!formData.reg_password) {
      newErrors.reg_password = "Password is required";
    } else if (formData.reg_password.length < 6) {
      newErrors.reg_password = "Password must be at least 6 characters";
    }

    if (!formData.reg_mem_name.trim()) {
      newErrors.reg_mem_name = "Full name is required";
    }

    if (!formData.reg_mobile.trim()) {
      newErrors.reg_mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.reg_mobile)) {
      newErrors.reg_mobile = "Invalid mobile number";
    }

    if (formData.reg_email && !/^\S+@\S+\.\S+$/.test(formData.reg_email)) {
      newErrors.reg_email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await signup(formData);
      if (response) {
        router.push("/sign-in");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to sign up. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Create Account</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Sponsor ID *</Text>
            <TextInput
              placeholder="Enter Sponsor ID"
              style={[styles.input, errors.reg_sponser_id && styles.inputError]}
              value={formData.reg_sponser_id}
              onChangeText={(text) => handleChange("reg_sponser_id", text)}
            />
            {errors.reg_sponser_id && (
              <Text style={styles.errorText}>{errors.reg_sponser_id}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password *</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Enter Password"
                secureTextEntry={!showPassword}
                style={[styles.input, errors.reg_password && styles.inputError]}
                value={formData.reg_password}
                onChangeText={(text) => handleChange("reg_password", text)}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <MaterialIcons
                  name={showPassword ? "visibility-off" : "visibility"}
                  size={24}
                  color="#777"
                />
              </TouchableOpacity>
            </View>
            {errors.reg_password && (
              <Text style={styles.errorText}>{errors.reg_password}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              placeholder="Enter Your Full Name"
              style={[styles.input, errors.reg_mem_name && styles.inputError]}
              value={formData.reg_mem_name}
              onChangeText={(text) => handleChange("reg_mem_name", text)}
            />
            {errors.reg_mem_name && (
              <Text style={styles.errorText}>{errors.reg_mem_name}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Sponsor Name</Text>
            <TextInput
              placeholder="Enter Sponsor Name"
              style={styles.input}
              value={formData.reg_sponser_name}
              onChangeText={(text) => handleChange("reg_sponser_name", text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mobile Number *</Text>
            <TextInput
              placeholder="Enter Mobile Number"
              keyboardType="phone-pad"
              style={[styles.input, errors.reg_mobile && styles.inputError]}
              value={formData.reg_mobile}
              onChangeText={(text) => handleChange("reg_mobile", text)}
              maxLength={10}
            />
            {errors.reg_mobile && (
              <Text style={styles.errorText}>{errors.reg_mobile}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Enter Email"
              keyboardType="email-address"
              style={[styles.input, errors.reg_email && styles.inputError]}
              value={formData.reg_email}
              onChangeText={(text) => handleChange("reg_email", text)}
              autoCapitalize="none"
            />
            {errors.reg_email && (
              <Text style={styles.errorText}>{errors.reg_email}</Text>
            )}
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/sign-in")}
          >
            <Text style={styles.loginButtonText}>
              Already have an account? Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  container: {
    padding: 16,
    paddingBottom: 40,
    flexGrow: 1,
    justifyContent: "center",
  },
  section: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3498db",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    color: "#34495e",
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  inputError: {
    borderColor: "#e74c3c",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 12,
    marginTop: 4,
  },
  passwordContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    top: 12,
  },
  submitButton: {
    backgroundColor: "#3498db",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 16,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginButton: {
    padding: 10,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#3498db",
    fontSize: 14,
  },
});

export default SignupScreen;
