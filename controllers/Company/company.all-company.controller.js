import CompanySchema from "../../models/company.model.js";

export const AddCompany = async (req, res) => {
  try {
    const { companyName, companyDescription, companyWebsite, companyLocation, companyDifficulty } = req.body;

    if (await CompanySchema.findOne({ companyName })) {
      return res.json({ msg: "Company Name Already Exist!" });
    }

    const newCompany = new CompanySchema({
      companyName,
      companyDescription,
      companyWebsite,
      companyLocation,
      companyDifficulty
    });

    await newCompany.save();

    return res.status(201).json({ msg: "Company Created Successfully!" });
  } catch (error) {
    console.error("company.controller.js = AddCompany => ", error);
    return res.status(500).json({ msg: 'Server Error' });
  }
};

export const CompanyDetail = async (req, res) => {
  try {
    if (req.query.companyId) {
      const company = await CompanySchema.findById(req.query.companyId);
      return res.json({ company });
    }
    return res.status(400).json({ msg: "companyId query parameter required" });
  } catch (error) {
    console.error("company.controller.js = CompanyDetail => ", error);
    return res.status(500).json({ msg: 'Server Error' });
  }
};

export const AllCompanyDetail = async (req, res) => {
  try {
    const companies = await CompanySchema.find();
    return res.json({ companies });
  } catch (error) {
    console.error("company.controller.js = AllCompanyDetail => ", error);
    return res.status(500).json({ msg: 'Server Error' });
  }
};

export const DeleteCompany = async (req, res) => {
  try {
    const company = await CompanySchema.findById(req.body.companyId);
    if (!company) {
      return res.status(404).json({ msg: "Company not found" });
    }

    await company.deleteOne();
    return res.json({ msg: "Company Deleted Successfully!" });
  } catch (error) {
    console.error("company.controller.js = DeleteCompany => ", error);
    return res.status(500).json({ msg: 'Server Error' });
  }
};
