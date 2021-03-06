import * as express from 'express';
import * as TagStore from 'store/TagStore';
import { isTeacher } from 'auth/Utils';

const router = express.Router();

router.get('/', (_, res) => {
  TagStore.selectAll()
    .then(result => res.status(200).json(result))
    .catch(error => {
      console.error('Failed to fetch tags:', error);
      return res.status(500).send();
    });
});

router.post('/', isTeacher, (req, res) => {
  return TagStore.insert(req.body)
    .then(result => res.status(201).json(result))
    .catch(error => {
      console.error('Failed to add new tag:', error);
      return res.status(500).send();
    });
});

export default router;