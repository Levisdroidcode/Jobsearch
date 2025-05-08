import axios from 'axios';

const fetchJobListings = async () => {
  const options = {
    method: 'POST',
    url: 'https://jobs-search-api.p.rapidapi.com/getjobs',
    headers: {
      'x-rapidapi-key': '39bb558664msh52d975725c79593p19d721jsn34fa5fae34a3',
      'x-rapidapi-host': 'jobs-search-api.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      search_term: 'Web Developer',
      location: 'Kenya',
      results_wanted: 100,
      site_name: [
        'indeed',
        'linkedin',
        'zip_recruiter',
        'glassdoor'
      ],
      distance: 50,
      job_type: 'fulltime',
      is_remote: true,
      linkedin_fetch_description: false,
      hours_old: 72
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// Call the async function to fetch job listings
fetchJobListings();
