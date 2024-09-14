import express from "express";
import { urlModel } from "../models/shortUrl.js";

// createUrl
export const createUrl = async (req, res) => {
  try {
    const { fullUrl } = req.body;

    const urlFound = await urlModel.findOne({ fullUrl });
    if (urlFound) {
      return res.status(409).send(urlFound); // URL already exists
    }

    // Create new short URL using the schema's default value for `shortUrl`
    const shortUrl = await urlModel.create({ fullUrl });
    return res.status(201).send(shortUrl);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong! Please try again",
      error,
    });
  }
};

// getAllUrl
export const getAllUrl = async (req, res) => {
  try {
    const shortUrls = await urlModel.find();

    if (shortUrls.length === 0) {
      return res.status(404).send({ message: "No Short URLs found" });
    }

    res.status(200).send(shortUrls);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong! Please try again", error });
  }
};

//getUrl
export const getUrl = async (req, res) => {
  try {
    const shortUrl = await urlModel.findOne({ shortUrl: req.params.id });
    if (!shortUrl) {
      res.status(404).send({ message: "Url Not Found!" });
    } else {
      shortUrl.clicks++;
      shortUrl.save();
      res.redirect(`${shortUrl.fullUrl}`);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong! Please try again", error });
  }
};

// // deleteUrl
export const deleteUrl = async (req, res) => {
  try {
    const shortUrl = await urlModel.findByIdAndDelete({ _id: req.params.id });
    if (shortUrl) {
      res.status(200).send({ message: "Url Deleted" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong! Please try again", error });
  }
};

// // getUrl - Alternative Implementation
// export const getUrl = async (req, res) => {
//   try {
//     const { shortUrl } = req.params;

//     // Find the full URL by the short URL
//     const urlFound = await urlModel.findOne({ shortUrl });

//     if (!urlFound) {
//       // If no URL is found, send a 404 status
//       return res.status(404).json({ message: "Short URL not found" });
//     }

//     // Optionally, increment the click count and save
//     urlFound.clicks += 1;
//     await urlFound.save();

//     // Send the full URL and updated click count as a response
//     return res.status(200).json({ fullUrl: urlFound.fullUrl, clicks: urlFound.clicks });
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong! Please try again", error });
//   }
// };

// deleteUrl - Alternative Implementation
// export const deleteUrl = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Find the URL by ID or short URL
//     const urlFound = await urlModel.findById(id);

//     if (!urlFound) {
//       // If no URL is found, send a 404 status
//       return res.status(404).json({ message: "Short URL not found" });
//     }

//     // Delete the found URL
//     await urlFound.remove();

//     // Send success response with the deleted URL information
//     return res
//       .status(200)
//       .json({ message: "Short URL deleted successfully", url: urlFound });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Something went wrong! Please try again", error });
//   }
// };
