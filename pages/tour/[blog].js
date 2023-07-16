import React from "react";
import { useRouter } from "next/router";

const Blog = () => {
  const router = useRouter();
  const { blog } = router.query; // Obtén el parámetro [blog] de la URL

  // Aquí puedes hacer una solicitud a la base de datos o utilizar los datos en el estado local para obtener la información del blog con el _id proporcionado

  return (
    <div>
      <h1>Blog: {blog}</h1>
    </div>
  );
};

export default Blog;
