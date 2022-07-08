interface PatientDataModel {
  active_series_id: string;
  algo_status: Map<string, number>;
  annotation_status: number;
  body_part: string;
  cases: Array<CasesModel>;
  cloud_3d_url: string;
  contouring_finished: boolean;
  created_at: string;
  creator: string;
  deleted_at: string | null;
  dicom_attrs: string | null;
  export_status: number;
  fk_collection_id: string;
  id: string;
  image_count: number;
  modality: string;
  patient_birthday: string;
  patient_id: string;
  patient_name: string;
  patient_sex: number;
  quick_status: number;
  report_status: number;
  series_count: number;
  source: number;
  study_count: number;
  updated_at: string;
  uploaded_at: string;
}

interface CasesModel {
  accession_number: string;
  created_at: string;
  creator: string;
  deleted_at: null | string;
  dicom_attrs: null | string;
  fk_collection_id: string;
  fk_patient_id: string;
  id: string;
  instution_name: string;
  patient_age: string;
  patient_birthday: string;
  patient_id: string;
  patient_name: string;
  patient_sex: string;
  series: Array<SeriesModel>;
  source: number;
  study_dateTime: string;
  study_description: null | string;
  study_id: string;
  study_instance_uid: string;
  updated_at: string;
}

interface SeriesModel {
  algo_status: Map<string, number>;
  algo_status_nodule: number;
  bits_allocated: number;
  body_part: null | string;
  columns: number;
  continuity: boolean;
  contrast: null | string;
  created_at: string;
  creator: string;
  deleted_at: null | string;
  dicom_attrs: null | string;
  dose: Array<string>;
  export_status: number;
  fk_case_id: string;
  fk_collection_id: string;
  fk_patient_id: string;
  id: string;
  image_orientation_patient: Array<number>;
  image_type: string;
  isLocalizer: boolean;
  isMinThickness: boolean;
  lastContinuityTime: null | string;
  masks: Array<string>;
  modality: string;
  num_of_instances: number;
  patient_position: string;
  plan: Array<string>;
  pre_treated: Map<string, any>;
  protocol_name: string;
  rescale_type: string;
  rows: number;
  series_dateTime: string;
  series_description: string;
  series_instance_uid: string;
  series_number: string;
  series_remark: Map<string, boolean>;
  sop_instance_list: Map<number, SopModel>;
  source: number;
  spacing_between_slices: null | string;
  storage_size: string;
  structureSequences: Array<object>;
  tabel_height: number;
  thickness: number;
  tissues: Array<string>;
  updated_at: string;
  window_center: number;
  window_width: number;
}

interface SopModel {
  columnCosines: [number, number, number];
  columnPixelSpacing: number;
  frameOfReferenceUID: string;
  imagePositionPatient: [number, number, number];
  intercept: number;
  length: number;
  modality: string;
  offset: number;
  photometricInterpretation: string;
  pixelRepresentation: number;
  rowCosines: [number, number, number];
  rowPixelSpacing: number;
  sliceLocation: string;
  slope: number;
  sop_UID: string;
  study_id: string;
  thickness: string;
}

export type { PatientDataModel, CasesModel, SeriesModel, SopModel };
