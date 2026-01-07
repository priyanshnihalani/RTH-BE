const ejs = require("ejs");
const path = require("path");
const generatePDF = require("../utils/generatePdf");
const { formatReadableDate } = require("../utils/formatReadableData");

exports.generateOfferLetter = async (req, res) => {
  const data = req.body;
  const html = await ejs.renderFile(
    path.join(__dirname, "../../templates/offer-letter.ejs"),
    data
  );

  const pdf = await generatePDF(html);

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=Offer_Letter.pdf"
  });

  res.send(pdf);
};

exports.generateCertificate = async (req, res) => {
  const data = {...req.body, startDate: formatReadableDate(req.body.joinedDate), endDate: formatReadableDate(req.body.endDate)};

  const html = await ejs.renderFile(
    path.join(__dirname, "../../templates/certificate.ejs"),
    data
  )

  const pdf = await generatePDF(html)
  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=Certificate.pdf"
  });

  res.send(pdf);
}