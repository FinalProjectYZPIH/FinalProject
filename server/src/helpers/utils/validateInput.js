
export const validateInput = (zodSchema , req, res) => {
    let error = {};
      const result = zodSchema.safeParse(req?.body);
  
      if (!result.success) {
        result.error.issues.forEach(
          (issue) => (error = { ...error, [issue.path[0]]: issue.message })
        );
        const message =
          Object.keys(error).length > 0
            ? { errors: error }
            : { success: true };
            console.log({ message: message })
            return res.status(400).json({ errors: error });
      }

      return true
}