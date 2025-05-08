import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, TextInput, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { getJobListings } from '../Api/businessApi';
import JobDetails from '../components/JobDetails'; // Import JobDetails component

export default function NyumbaniScreen() {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null); // State for selected job details

  const fetchJobListings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getJobListings(searchTerm);
      if (data.status) {
        setJobListings(data.jobs || []);
      } else {
        setError(data.message || 'Failed to fetch job listings');
      }
    } catch (err) {
      setError('Failed to fetch job listings');
    } finally {
      setLoading(false);
    }
  };

  const handleJobSelect = (job) => {
    setSelectedJob(job); // Set the selected job to display its details
  };

  const handleBackToList = () => {
    setSelectedJob(null); // Go back to the job listings
  };

  if (selectedJob) {
    return (
      <View style={styles.container}>
        <Button title="Back to Listings" onPress={handleBackToList} />
        <JobDetails job={selectedJob} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search job listings..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Button title="Fetch Job Listings" onPress={fetchJobListings} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={jobListings}
        keyExtractor={(item) => item.id.toString()} // Ensure item.id is a string
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleJobSelect(item)} style={styles.jobCard}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.jobCompany}>{item.company}</Text>
            <Text>{item.location}</Text>
            <Text>{item.date_posted}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginBottom: 12,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  jobCard: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 8,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  jobCompany: {
    fontSize: 14,
    color: '#555',
  },
});
