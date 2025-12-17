import multer from "multer";
//for service image
const serviceStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/services");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

export const uploadService = multer({ storage: serviceStorage });

//for gallery image
const galleryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/gallery");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

export const uploadGallery = multer({ storage: galleryStorage });

//trusted costumer

const TrustedCostumerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/costumer");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

export const uploadCostumer = multer({
  storage: TrustedCostumerStorage,
});
