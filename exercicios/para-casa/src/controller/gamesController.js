const gamesModel = require("../models/gamesModel");
const consolesModel = require("../models/consolesModel")
 
const findAllGames = async (req, res) => {
    try {
      const allGames = await gamesModel.find();
      res.status(200).json(allGames);
    } catch (error) {
      res.status(500).json({ message: error.message });
    };
  };
  const findGameById = async (req, res) => {
    try {
      const findGame = await gamesModel.findById(req.params.id).populate(
        "console"
      );
      if (findGame == null) {
        res.status(404).json({ message: "Game not available" });
      }
      res.status(200).json(findGame);
    } catch (error) {
      res.status(500).json({ message: error.message });
    };
  };
  const addNewGame = async (req, res) => {
    try {
      const {
        consoleId,
        name,
        developer,
        releaseDate,
        genre,
        available,
        description,
      } = req.body;
  
      if (!consoleId) {
        return res
          .status(400).json({ message: "Required: Enter the Console id." });
      };
  
      const findConsole = await consolesModel.findById(consoleId);
  
      if (!findConsole) {
        return res.status(404).json({ message: "Console not found" });
      };
  
      const newGame = new gamesModel({
        console: consoleId,
        name,
        developer,
        releaseDate,
        genre,
        available,
        description,
      });
      const savedGame = await newGame.save();
      res
        .status(200)
        .json({ message: "New game added successfully!", savedGame });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    };
  };
  const updateGame = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        consoleId,
        name,
        developer,
        releaseDate,
        genre,
        available,
        description,
      } = req.body;
      const findGame = await gamesModel.findById(id);
      if (findGame == null) {
        res.status(404).json({ message: "Game not found" });
      };
  
      if (gameId) {
        const findGame = await gamesModel.findById(gameId);
  
        if (findGame == null) {
          return res.status(404).json({ message: "Game not found" });
        };
      };
      findGame.name = name || findGame.name;
      findGame.developer = developer || findGame.developer;
      findGame.releaseDate = releaseDate || findGame.releaseDate;
      findGame.genre = genre || findGame.genre;
      findGame.available = available || findGame.available;
      findGame.description = description || findGame.description;
      findGame.console = consoleId || findGame.console;
  
      const savedGame = await findGame.save();
      res.status(200).json({ message: "Game successfully updated", savedGame });
    } catch (error) {
      res.status(500).json({ message: error.message });
    };
  };

  const findGameByName = async (req, res) => {
    try {
      const findName = await gamesModel.find(req.query.name);
      if (findName == null) {
        res.status(404).json({ message: "Game not found." });
      }
      res.status(200).json(findName);
    } catch (error) {
      res.status(500).json({ message: error.message });
    };
  };



  const deleteGame = async (req, res) => {
    try {
      const { id } = req.params;
      const findGames = await gamesModel.findById(id);
  
      if (findGames == null) {
        return res.status(404).json({ message: `Game with id ${id} not found` })
      };
      await findGames.remove();
      res.status(200).json({ message: `Game with id ${id} was successfully deleted` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    };
  };


  module.exports = {
    findAllGames,
    findGameById,
    addNewGame,
    updateGame,
    deleteGame,
    findGameByName,
  };
  
    