//  Разрешение обхода политики CORS для конкретного хоста 

export const cors = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
}