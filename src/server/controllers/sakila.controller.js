import sakilaModule from '../modules/sakila.module';


const sakilaGet = (req, res) => {
  sakilaModule.selectSakilaStaff(req.token).then((result) => {
    res.send(result);
  }).catch((err) => { return res.send(err); });
};


const sakilaPost = (req, res) => {
  const insertValues = req.body;
  sakilaModule.createSakilaStaff(req.token, insertValues).then((result) => {
    res.send(result);
  }).catch((err) => { return res.send(err); });
};

const sakilaPut = (req, res) => {
  const sakilaId = req.params.staff_id;
  const insertValues = req.body;
  sakilaModule.modifySakilaStaff(insertValues, sakilaId).then((result) => {
    res.send(result);
  }).catch((err) => { return res.send(err); });
};

const sakilaDelete = (req, res) => {
  const sakilaId = req.params.staff_id;
  sakilaModule.deleteSakilaStaff(sakilaId).then((result) => {
    res.send(result); 
  }).catch((err) => { return res.send(err); }); 
};

const test = (req, res) => {
  res.send('測試');
};


export default {
  test,
  sakilaGet,
  sakilaPost,
  sakilaPut,
  sakilaDelete
};