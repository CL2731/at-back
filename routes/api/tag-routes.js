const router = require('express').Router();
const { json } = require('express/lib/response');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product}, {through: ProductTag}],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', (req, res) => {
  try {
    const tagData = await Tag.findOne({
      where: {id: req.params.id}, 
    include: [{model: Product}, {through: ProductTag}],
  });
  res.status(200).json(tagData);
} catch (err) {
  res.status(404).json(err)
}
});

router.post('/', (req, res) => {
  try {
    const tagData = await Tag.create(req.body)
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {id: req.params.id},
    });
    res.status(200),json(tagData);
  } catch (err) {
    res.status(404).json(err)
  }
});

router.delete('/:id', (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {id: req.params.id}
    });
    res.status(200).json(tagData)
  } catch (err) {
    res.status(404).json(err)
  }
});

module.exports = router;
