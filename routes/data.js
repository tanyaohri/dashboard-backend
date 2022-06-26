const express  = require("express"),
      router   = express.Router();

const { 
    generate_random_graph_data,
    generate_random_tickets_data
 } = require("./../controller/dataController");

router.get("/graphical", generate_random_graph_data);
router.get("/tickets", generate_random_tickets_data);
module.exports=router;