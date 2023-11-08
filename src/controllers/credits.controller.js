import Credit from "../models/credits.model.js";
import User from "../models/user.model.js";

export const getCredits = async (req, res) => {
  const { id } = req.user;

  const credits = await Credit.findOne({
    where: { UserId: id },
    butes: ["freeCreattridits", "premiumCredits"],
  });
  res.status(200).json({
    ok: true,
    status: 200,
    credits,
  });
};

export const addFreeCredits = async (req, res) => {
  const user = req.user;
  const { freeCredits } = req.body;

  if (user) {
    const thisUser = await User.findOne({
      where: { id: user.id },
      attributes: ["userName", "email"],
      include: {
        model: Credit,
      },
    });

    const updateFreeCredits = await Credit.update(
      {
        freeCredits: thisUser.Credit.freeCredits + freeCredits,
      },
      {
        where: { UserId: user.id },
      }
    );
    res.status(202).json({
      ok: true,
      status: 202,
      message: "Free credits updated",
      freeCredits: thisUser.Credit.freeCredits + freeCredits,
    });
  } else {
    res.status(400).json({
      ok: false,
      status: 400,
      message: "User not found",
    });
  }
};

export const addPremiumCredits = async (req, res) => {
  const user = req.user;
  const { premiumCredits } = req.body;

  if (user && user.service == "premium") {
    const thisUser = await User.findOne({
      where: { id: user.id },
      attributes: ["userName", "email"],
      include: {
        model: Credit,
      },
    });

    const updatePremiumCredits = await Credit.update(
      {
        premiumCredits: thisUser.Credit.premiumCredits + premiumCredits,
      },
      {
        where: { UserId: user.id },
      }
    );
    res.status(202).json({
      ok: true,
      status: 202,
      message: "Free credits updated",
      premiumCredits: thisUser.Credit.premiumCredits + premiumCredits,
    });
  } else {
    res.status(400).json({
      ok: false,
      status: 400,
      message: "The user does not include premium service",
    });
  }
};

export const subtractFreeCredits = async (req, res) => {
  const user = req.user;
  const { freeCredits } = req.body;

  if (user) {
    const thisUser = await User.findOne({
      where: { id: user.id },
      attributes: ["userName", "email"],
      include: {
        model: Credit,
      },
    });
    if (thisUser.Credit.freeCredits >= freeCredits) {
      const updateFreeCredits = await Credit.update(
        {
          freeCredits: thisUser.Credit.freeCredits - freeCredits,
        },
        {
          where: { UserId: user.id },
        }
      );
      res.status(202).json({
        ok: true,
        status: 202,
        message: "Free credits updated",
        freeCredits: thisUser.Credit.freeCredits - freeCredits,
      });
    } else {
      res.status(400).json({
        ok: false,
        status: 400,
        message: "Insufficient credits",
      });
    }
  } else {
    res.status(400).json({
      ok: false,
      status: 400,
      message: "User not found",
    });
  }
};

export const subtractPremiumCredits = async (req, res) => {
  const user = req.user;
  const { premiumCredits } = req.body;

  if (user && user.service == "premium") {
    const thisUser = await User.findOne({
      where: { id: user.id },
      attributes: ["userName", "email"],
      include: {
        model: Credit,
      },
    });

    if (thisUser.Credit.premiumCredits >= premiumCredits) {
      const updatePremiumCredits = await Credit.update(
        {
          premiumCredits: thisUser.Credit.premiumCredits - premiumCredits,
        },
        {
          where: { UserId: user.id },
        }
      );
      res.status(202).json({
        ok: true,
        status: 202,
        message: "Free credits updated",
        premiumCredits: thisUser.Credit.premiumCredits - premiumCredits,
      });
    } else {
      res.status(400).json({
        ok: false,
        status: 400,
        message: "Insufficient credits",
      });
    }
  } else {
    res.status(400).json({
      ok: false,
      status: 400,
      message: "The user does not include premium service",
    });
  }
};
