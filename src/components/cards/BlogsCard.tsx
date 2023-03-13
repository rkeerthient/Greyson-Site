export default function BlogsCard(props: any) {
  const { result } = props;
  const resData = result.rawData as unknown as any;

  return (
    <>
      {resData && (
        <article
          key={resData.id}
          style={{
            display: "flex",
            isolation: "isolate",
            overflow: "hidden",
            position: "relative",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            paddingBottom: "2rem",
            paddingTop: "20rem",
            backgroundColor: "#111827",
            flexDirection: "column",
            justifyContent: "flex-end",
            borderRadius: "1rem",
          }}
        >
          {resData.primaryPhoto && (
            <img
              src={resData.primaryPhoto.image.url}
              alt=""
              style={{
                objectFit: "cover",
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: "-1",
                opacity: 0.5,
              }}
            />
          )}
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
          <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

          <div
            style={{
              display: "flex",
              overflow: "hidden",
              color: "#D1D5DB",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              flexWrap: "wrap",
              alignItems: "center",
              rowGap: "0.25rem",
            }}
          >
            <div className="mr-8">{getDateString()}</div>
            <div
              style={{
                display: "flex",
                marginLeft: "-1rem",
                alignItems: "center",
                columnGap: "1rem",
              }}
            >
              <svg
                viewBox="0 0 2 2"
                style={{
                  marginLeft: "-0.125rem",
                  flex: "none",
                  width: "0.125rem",
                  height: "0.125rem",
                }}
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
              <div style={{ display: "flex", columnGap: "0.625rem" }}></div>
            </div>
          </div>
          <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
            <a href={resData.landingPageUrl}>
              <span className="absolute inset-0" />
              {resData.name}
            </a>
          </h3>
        </article>
      )}
    </>
  );
}
const getDateString = () => {
  var dt = new Date();
  var month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let res =
    month[dt.getMonth()] + ". " + dt.getDate() + ", " + dt.getFullYear();
   return res.toString();
};
