import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, Image } from 'react-native';

const JobDetails = ({ job }) => {
  // Destructure the job object to get the required fields
  const {
    title,
    company,
    location,
    is_remote,
    description,
    job_url,
    company_url,
    company_logo
  } = job;

  return (
    <View style={styles.container}>
      {company_logo && (
        <Image source={{ uri: company_logo }} style={styles.logo} />
      )}
      <Text style={styles.title}>{title || "Title Unavailable"}</Text>
      <Text style={styles.company}>{company || "Company Unavailable"}</Text>
      <Text style={styles.location}>{location || "Location Unavailable"}</Text>
      <Text style={styles.remote}>
        {is_remote ? "Remote: Yes" : "Remote: No"}
      </Text>
      <Text style={styles.description}>
        {description || "Description Unavailable"}
      </Text>
      <TouchableOpacity
        style={styles.link}
        onPress={() => Linking.openURL(job_url)}
      >
        <Text style={styles.linkText}>View Job Listing</Text>
      </TouchableOpacity>
      {company_url && (
        <TouchableOpacity
          style={styles.link}
          onPress={() => Linking.openURL(company_url)}
        >
          <Text style={styles.linkText}>Visit Company Profile</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginTop: 16,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 8,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  company: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    marginBottom: 4,
  },
  remote: {
    fontSize: 14,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  link: {
    marginTop: 8,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default JobDetails;
