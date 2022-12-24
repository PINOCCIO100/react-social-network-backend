//  Разрешение обхода политики CORS для конкретного хоста 

exports.cors = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
}