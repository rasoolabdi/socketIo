/**
 * @swagger
 *  tags:
 *      name: Auth
 *      description: all routes Auth
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          SendOtp:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: mobile of user
 */

/**
 * @swagger
 *  /chat/login:
 *      post:
 *          tags: [Auth]
 *          summary: send otp
 *          description: send otp
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/SendOtp"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/SendOtp"
 *              responses:
 *                  200:
 *                      description: sendOTP successfully
 */