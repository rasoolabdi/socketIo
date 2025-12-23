/**
 * tags: 
 *  name: namespace
 *  description: "all routes namespace"
 * 
 *  name: room
 *  description: get all routes rooms
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          NameSpace:
 *              type: object
 *              required:
 *                  -   title
 *                  -   endpoint
 *              properties:
 *                  title: 
 *                      type: string
 *                      description: the title of namespace
 *                  endpoint:
 *                      type: string
 *                      description: the endpoint of namespace
 *          Room:
 *              type: object
 *              required: 
 *                  -   name
 *                  -   description
 *                  -   namespace
 *              properties:
 *                  name:
 *                      type: string
 *                      description: the title of category
 *                  description:
 *                      type: string
 *                      description: the description of text of blog
 *                  image:
 *                      type: file
 *                      description: the index picture of blog
 *                  namespace:
 *                      type: string
 *                      description: namespace of conversation
 */

/**
 * @swagger
 *  /chat/namespace/add:
 *      post:
 *          tags: [namespace]
 *          summary: add namespace for chatroom
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/NameSpace"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/NameSpace"
 *          responses:
 *                  201:
 *                      description: add new namespace successfully
 */

/**
 * @swagger
 *  /chat/namespace/list:
 *      get:
 *          tags: [namespace]
 *          summary: get all namespaces
 *          description: get all namespaces
 *          responses:
 *              200:
 *                  description: successfully
 */

/**
 * @swagger
 *  /chat/room/add:
 *      post:
 *          tags: [room]
 *          summary: add new room in namespace for chatroom
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/Room"
 *          responses:
 *              201:
 *                  description: add new room successfully
 */ 

/**
 * @swagger
 *  /chat/room/list:
 *      get:
 *          tags: [room]
 *          summary: get rooms
 *          description: get all rooms
 *          responses:
 *              200:
 *                  description: successfully
 */
