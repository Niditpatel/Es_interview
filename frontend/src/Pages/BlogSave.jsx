import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import APP_URL from "../config";

export default function BlogSave() {
  const [data, setData] = {
    title: "",
    description: "",
  };

  const { id } = useParams();

  const navigate = useNavigate();

  const onchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const categories = [
    { value: "Finance", label: "Finance" },
    { value: "IT", label: "IT" },
    { value: "Pharma", label: "Pharma" },
  ];

  const StatusOptions = [
    { value: "Approved", label: "Approved" },
    { value: "Pending", label: "Pending" },
    { value: "Rejected", label: "Rejected" },
  ];

  const handleSubmit = async () => {
    if (data.title.length < 5 || data.title.length > 100) {
      return alert("title must be between 5 to 100 characters");
    }

    let result = "";
    try {
      if (id) {
        result = await axios.put(`${APP_URL}/blog/${id}`, data);
        if (result.data.success) {
          navigate("/blogs");
        }
      } else {
        result = await axios.post(`${APP_URL}/blog`, data);
        if (result.data.success) {
          navigate("/blogs");
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={onchange}
          required
          placeholder="Title"
        ></input>{" "}
        <br />
        <input
          type="text"
          name="description"
          value={data.description}
          onChange={onchange}
          required
          placeholder="Description"
        ></input>{" "}
        <br />
        <Select
          name="category"
          options={categories}
          value={categories.find((x) => x.value === data.category)}
          placeholder="Select Category"
          required
        />
        <br />
        <Select
          name="status"
          options={StatusOptions}
          value={StatusOptions.find((x) => x.value === data.status)}
          placeholder="Select Status"
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
