const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
// The `/api/tags` endpoint
router.get('/', async (req, res) => {
  try {
    console.log(Tag)
    console.log("working?")
    const tagData = await Tag.findAll({
      include: [{model: Product, through: ProductTag}],
    });
    console.log(tagData)
    res.status(200).json(tagData);
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
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

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body)
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {id: req.params.id},
    });
    res.status(200),json(tagData);
  } catch (err) {
    res.status(404).json(err)
  }
});

router.delete('/:id', async (req, res) => {
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
