package com.miked.honeydo.api;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

/**
 * Created by mdonovan on 3/19/15.
 */
@Path("/users")
@Produces("application/json")
public class UserResource {

    @GET
    public Response getUser() {
        return null;
    }
}
