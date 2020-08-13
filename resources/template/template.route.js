const express = require("express");
const templateController = require("./template.controller");
const isAuthorized = require("../../middlewares/auth.middleware");

// eslint-disable-next-line new-cap
const router = express.Router();


/**
 * @typedef TemplateDetail
 * @property {string} id - template id
 * @property {integer} views - view count
 * @property {integer} points - point to the template
 * @property {Array.<string>} tags - tags for the template
 * @property {string} content - template content
 * @property {string} title - template title
 */

/**
 * @typedef Template
 * @property {string} id - template id
 * @property {integer} views - view count
 * @property {integer} points - point to the template
 * @property {Array.<string>} tags - tags for the template
 * @property {string} content - template content
 * @property {string} title - template title
 */

/**
 * @typedef TemplateRequest
 * @property {string} content.required - template content
 * @property {string} title.required - template title
 * @property {Array.<string>} tags
 */

/**
 * Get all templates
 * @route GET /templates Get available templates.
 * @group Templates - Operations about Templates
 * @param {integer} start.query.required - start index
 * @param {integer} limit.query.required - limit
 * @returns {Array.<Template>} 200 - An array of templates
 * @returns {Error}  default - Unexpected error
 */
router.get("/", isAuthorized, templateController.getTemplates);

/**
 * Get template for the given id
 * @route GET /templates/{templateId} Get Template detail for the given id.
 * @group Templates - Operations about Templates
 * @param {string} templateId.path.required - template id.
 * @returns {TemplateDetail.model} 200 - Template Detail
 * @returns {Error}  default - Unexpected error
 */
router.get("/:templateId", templateController.getTemplateById);

/**
 * Get templates for the given template ids.
 * @route PUT /templates Get available templates.
 * @group Templates - Operations about Templates
 * @param {Array.<string>} TemplateIds.body.required - template ids
 * @returns {Array.<Template>} 200 - An array of templates
 * @returns {Error}  default - Unexpected error
 */
router.put("/", templateController.getTemplatesByIds);

/**
 * Create new template.
 * @route POST /templates Create new template.
 * @group Templates - Operations about Templates
 * @param {TemplateRequest.model} template.body.required - TemplateRequest Model
 * @returns {Template.model} 200 - created template
 * @returns {Error}  default - Unexpected error
 */
router.post("/", isAuthorized, templateController.createNewTemplate);
router.post("/_fake", templateController.createFakeTemplates);
router.get("/isAlive", (req, res) => res.status(201).end());

module.exports = router;
