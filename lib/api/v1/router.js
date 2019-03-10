import express from 'express';
import SpecialtiesController from './specialties/SpecialtiesController';
import ProvidersController from './providers/ProvidersController';
const router = express.Router();

/* ------------------------- Specialties ------------------------- */

router.get('/specialties', SpecialtiesController.getSpecialties);
router.get('/specialties/:id', SpecialtiesController.getSpecialty);
router.post('/specialties', SpecialtiesController.createSpecialty);
router.put('/specialties/:id', SpecialtiesController.updateSpecialty);
router.delete('/specialties/:id', SpecialtiesController.deleteSpecialty);

/* ------------------------- Specialties ------------------------- */

/* ------------------------- Providers ------------------------- */

router.get('/providers', ProvidersController.getProviders);
router.get('/providers/:id', ProvidersController.getProvider);
router.post('/providers', ProvidersController.createProvider);
router.put('/providers/:id', ProvidersController.updateProvider);
router.delete('/providers/:id', ProvidersController.deleteProvider);

/* ------------------------- Providers ------------------------- */

export default router;