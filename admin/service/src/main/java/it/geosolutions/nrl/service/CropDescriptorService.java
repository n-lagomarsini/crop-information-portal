/**
 * 
 */
package it.geosolutions.nrl.service;

import it.geosolutions.nrl.persistence.dao.impl.CropDescriptorDAOImpl;
import it.geosolutions.nrl.persistence.model.CropDescriptor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Admin
 *
 */
@Transactional
public class CropDescriptorService {
	@Autowired
	private CropDescriptorDAOImpl cropDescriptorDao;
	
	public List<CropDescriptor> getAll(){
		return cropDescriptorDao.findAll();
	}
	
	public void persist(CropDescriptor cd){
		
			cropDescriptorDao.persist(cd);
		
	}
	public CropDescriptor get(String id){
		return cropDescriptorDao.find(id);
		
	}
	
	public void update(CropDescriptor c){
		cropDescriptorDao.merge(c);
	}
	
	public void delete(String id){
		cropDescriptorDao.removeById(id);
	}
}
