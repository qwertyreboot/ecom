async function isAuthenticated(request, response, next) {
  if (!request.user) {
    return response.status(403).json({ message: "Not Allowed" });
  }

  return next();
}

async function isCustomer(request, response, next) {
  if (request.user.role !== "customer") {
    return response.status(403).json({ message: "Not Allowed" });
  }

  return next();
}

async function isStaff(request, response, next) {
  if (request.user.role !== "staff") {
    return response.status(403).json({ message: "Not Allowed" });
  }

  return next();
}

module.exports = { isAuthenticated, isCustomer, isStaff };
