function status(request, response) {
  response.status(200).json({ chave: "valor" });
}

export default status;
