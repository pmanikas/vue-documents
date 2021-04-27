const mongoose = require("mongoose");
const Document = require("./Document");

mongoose.connect("mongodb://localhost/google-docs-clone", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const io = require("socket.io")(3001, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const DEFAULT_DATA = "";

io.on("connection", (socket) => {
  socket.on("get-document", async ({ documentId, filename }) => {
    const document = await findOrCreateDocument({ id: documentId, filename });
    socket.join(documentId);
    socket.emit("load-document", document);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async ({ filename, data }) => {
      await Document.findByIdAndUpdate(documentId, { filename, data });
    });
  });
});

async function findOrCreateDocument({ id, filename }) {
  if (id == null) return;

  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: DEFAULT_DATA, filename });
}
