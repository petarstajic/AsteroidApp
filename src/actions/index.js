import nasaApi from '../apis/nasaApi';

export const formRequest = formValues => async dispatch => {
  const response = await nasaApi.get('/feed?', {
    params: {
      start_date: formValues.startDate,
      end_date: formValues.endDate,
      api_key: 'x0HeIJzRCLm3lj0zrfXt2LltusKVCO7aoHmRkVq2'
    }
  });

  const data = response.data.near_earth_objects;
  const asteroids = [];

  for (let date in data) {
    for (let obj in date) {
      if (
        typeof data[date][obj] === 'object' &&
        data[date][obj].is_potentially_hazardous_asteroid
      ) {
        const ast = data[date][obj];
        asteroids.push({
          date: date,
          id: ast.id,
          name: ast.name,
          speed:
            ast.close_approach_data[0].relative_velocity.kilometers_per_hour,
          minDiameter: ast.estimated_diameter.meters.estimated_diameter_min,
          maxDiameter: ast.estimated_diameter.meters.estimated_diameter_max,
          url: ast.links.self
        });
      }
    }
  }
  dispatch({
    type: 'FETCH_DATA',
    payload: asteroids
  });
};

export const fetchHistory = url => async dispatch => {
  const response = await nasaApi({ baseURL: `${url}` });

  const approachData = response.data.close_approach_data;
  const approachDates = [];
  let i = 0;
  for (let date in approachData) {
    //console.log(date)
    const parseDate = parseInt(
      approachData[date].close_approach_date.substr(0, 4)
    );

    if (parseDate >= 1900 && parseDate <= 1999) {
      i++;
    }
  }
  approachDates.push({
    asteroidName: response.data.name,
    approachNumber_1900_1999: i,
    id: response.data.id,
    progressCounter: 0
  });

  dispatch({ type: 'FETCH_ASTEROID_HISTORY', payload: approachDates });
};

export const storeSelectedAsteroids = asteroids => dispatch => {
  dispatch({ type: 'STORE_SELECTED_ASTEROIDS', payload: asteroids });
};

export const deleteSelected = element => dispatch => {
  dispatch({ type: 'DELETE_SELECTED_ASTEROID', payload: element });
};

export const deleteSelectedAsteroids = () => dispatch => {
  dispatch({ type: 'DELETE_ASTEROID_HISTORY' });
};

export const deleteSelectedState = () => dispatch => {
  dispatch({ type: 'DELETE_ALL' });
};
