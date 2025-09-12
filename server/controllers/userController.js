const { Op } = require("sequelize");
const { compare, hashing } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User, Product, Order, OrderDetail } = require("../models");

class UserController {
  static async register(req, res, next) {
    try {
      const { name, email, password, role } = req.body;
      const create = await User.create({ name, email, password, role });

      const result = {
        message: "User registeres successfully",
        user: {
          id: create.id,
          name: create.name,
          email: create.email,
          role: create.role,
        },
      };
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw {
          name: "BadRequest",
          status: 400,
          message: "request body required!",
        };
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw {
          name: "Unauthorized",
          status: 401,
          message: "invalid email or password",
        };
      }

      const comparePassword = compare(password, user.password);
      if (!comparePassword) {
        throw {
          name: "Unauthorized",
          status: 401,
          message: "invalid email or password",
        };
      }

      const accessToken = signToken({ id: user.id, role: user.role });
      const result = {
        message: "Login successfully",
        token: accessToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async userProfil(req, res, next) {
    try {
      const data = await User.findOne({
        where: { id: req.user.id },
        attributes: { exclude: ["password"] },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        throw {
          name: "BadRequest",
          status: 400,
          message: "request body required!",
        };
      }

      let user = await User.findByPk(req.user.id);
      if (!user) {
        throw { name: "notFound", status: 404, message: "user not found" };
      }

      user.name = name;
      user.email = email;
      user.password = password;

      await user.save();

      const result = {
        message: "Profile update successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  //ADMIN

  static async getUser(req, res, next) {
    try {
      let option = { where: {}, attributes: { exclude: ["password"] } };

      const { search, sort, page } = req.query;

      if (sort) {
        option.order = [["name", "desc"]];
      }

      if (search) {
        // option.where.name = {[Op.iLike] : `%${search}%`}
        option.where = {
          [Op.or]: [
            { name: { [Op.iLike]: `%${search}%` } },
            { role: { [Op.iLike]: `%${search}%` } },
            { email: { [Op.iLike]: `%${search}%` } },
          ],
        };
      }

      if (page) {
        option.limit = 10;
        option.offset = (page - 1) * 10;
      }

      const data = await User.findAll(option);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        throw {
          name: "NotFound",
          status: "404",
          message: `User with ID ${id} not found`,
        };
      }

      await User.destroy({ where: { id } });
      res.status(200).json({ message: "Delete user successfully" });
    } catch (error) {
      next(error);
    }
  }

  //PARAMS
  static async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
        include: Order,
      });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
