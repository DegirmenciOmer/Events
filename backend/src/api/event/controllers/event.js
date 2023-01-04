"use strict";

/**
 *  event controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::event.event", ({ strapi }) => ({
  async me(ctx, next) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No auth header found" }] },
      ]);
    }

    const data = await strapi.entityService.findMany("api::event.event", {
      populate: "image",
      filters: {
        user: {
          id: user.id,
        },
      },
    });
    if (!data) {
      return ctx.notFound();
    }

    const sanitizedEvents = await this.sanitizeOutput(data, ctx);

    return this.transformResponse(sanitizedEvents);
  },
  async create(ctx) {
    const { id } = ctx.state.user; //ctx.state.user contains the current authenticated user
    const response = await super.create(ctx);
    const updatedResponse = await strapi.entityService.update(
      "api::event.event",
      response.data.id,
      { data: { user: id } }
    );
    return updatedResponse;
  },
  //delete
  async delete(ctx) {
    var { id } = ctx.state.user;
    var [event] = await strapi.entityService.findMany("api::event.event", {
      filters: {
        id: ctx.request.params.id,
        user: id,
      },
    });
    if (event) {
      const response = await super.delete(ctx);
      const updatedResponse = await strapi.entityService.update(
        "api::event.event",
        response.data.id,
        { data: { user: id } }
      );
      return updatedResponse;
    } else {
      return ctx.unauthorized();
    }
  },
  //update
  async update(ctx) {
    var { id } = ctx.state.user;
    var [event] = await strapi.entityService.findMany("api::event.event", {
      filters: {
        id: ctx.request.params.id,
        user: id,
      },
    });
    console.log({ event, id });
    if (event) {
      const response = await super.update(ctx);
      return response;
    } else {
      return ctx.unauthorized();
    }
  },
}));
