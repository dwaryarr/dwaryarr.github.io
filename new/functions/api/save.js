export async function onRequestPost(context) {
  try {
    const { collection, data } = await context.request.json();

    if (!collection) {
      return Response.json(
        {
          success: false,
          error: "Collection required",
        },
        { status: 400 },
      );
    }

    await context.env.PORTFOLIO_DATA.put(collection, JSON.stringify(data));

    return Response.json({
      success: true,
    });
  } catch (err) {
    return Response.json(
      {
        success: false,
        error: err.message,
      },
      {
        status: 500,
      },
    );
  }
}
