const express = require('express');
const tagController = require('./tag.controller');

// eslint-disable-next-line new-cap
const router = express.Router();

/**
 * @route GET /tags Get Trending tags.
 * @group Tags - Operations about Tags
 * @returns {object} 200 - An array of trending tags
 * @returns {Error}  default - Unexpected error
 */
router.get('/', tagController.getTrendingTags);

/**
 * @route POST /tags Create tag.
 * @group Tags - Operations about Tags
 * @param {Tag.model} tag.body.required - the new point
 * @returns {object} 200
 * @returns {Error}  default - Unexpected error
 */
router.post('/', tagController.createTag);
router.get('/isAlive', (req, res) => res.status(201).end());

module.exports = router;
