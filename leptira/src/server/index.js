import axios from "axios";

export const getAllBooks = async () => {
  try {
    const endpoint = "http://localhost:8000/sve-knjige";

    const { data } = await axios.get(endpoint);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getGradeBooks = async (grade) => {
  try {
    const endpoint = "http://localhost:8000/knjige-za-razred";

    const { data } = await axios.get(endpoint, {
      params: {
        razred: grade,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPeriods = async () => {
  try {
    const endpoint = "http://localhost:8000/svi-periodi";

    const { data } = await axios.get(endpoint);

    return data;
  } catch (error) {
    console.log(error);
  }
};
