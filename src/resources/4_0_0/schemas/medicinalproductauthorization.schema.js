const {
	GraphQLNonNull,
	GraphQLEnumType,
	GraphQLList,
	GraphQLUnionType,
	GraphQLObjectType,
} = require('graphql');
const IdScalar = require('../scalars/id.scalar.js');
const UriScalar = require('../scalars/uri.scalar.js');
const CodeScalar = require('../scalars/code.scalar.js');
const DateTimeScalar = require('../scalars/datetime.scalar.js');

/**
 * @name exports
 * @summary MedicinalProductAuthorization Schema
 */
module.exports = new GraphQLObjectType({
	name: 'MedicinalProductAuthorization',
	description: 'The regulatory authorization of a medicinal product.',
	fields: () => ({
		resourceType: {
			type: new GraphQLNonNull(
				new GraphQLEnumType({
					name: 'MedicinalProductAuthorization_Enum_schema',
					values: {
						MedicinalProductAuthorization: {
							value: 'MedicinalProductAuthorization',
						},
					},
				}),
			),
			description: 'Type of resource',
		},
		_id: {
			type: require('./element.schema.js'),
			description:
				'The logical id of the resource, as used in the URL for the resource. Once assigned, this value never changes.',
		},
		id: {
			type: IdScalar,
			description:
				'The logical id of the resource, as used in the URL for the resource. Once assigned, this value never changes.',
		},
		meta: {
			type: require('./meta.schema.js'),
			description:
				'The metadata about the resource. This is content that is maintained by the infrastructure. Changes to the content might not always be associated with version changes to the resource.',
		},
		_implicitRules: {
			type: require('./element.schema.js'),
			description:
				'A reference to a set of rules that were followed when the resource was constructed, and which must be understood when processing the content. Often, this is a reference to an implementation guide that defines the special rules along with other profiles etc.',
		},
		implicitRules: {
			type: UriScalar,
			description:
				'A reference to a set of rules that were followed when the resource was constructed, and which must be understood when processing the content. Often, this is a reference to an implementation guide that defines the special rules along with other profiles etc.',
		},
		_language: {
			type: require('./element.schema.js'),
			description: 'The base language in which the resource is written.',
		},
		language: {
			type: CodeScalar,
			description: 'The base language in which the resource is written.',
		},
		text: {
			type: require('./narrative.schema.js'),
			description:
				"A human-readable narrative that contains a summary of the resource and can be used to represent the content of the resource to a human. The narrative need not encode all the structured data, but is required to contain sufficient detail to make it 'clinically safe' for a human to just read the narrative. Resource definitions may define what content should be represented in the narrative to ensure clinical safety.",
		},
		contained: {
			type: new GraphQLList(require('./resourcelist.schema')),
			description:
				'These resources do not have an independent existence apart from the resource that contains them - they cannot be identified independently, and nor can they have their own independent transaction scope.',
		},
		extension: {
			type: new GraphQLList(require('./extension.schema.js')),
			description:
				'May be used to represent additional information that is not part of the basic definition of the resource. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.',
		},
		modifierExtension: {
			type: new GraphQLList(require('./extension.schema.js')),
			description:
				"May be used to represent additional information that is not part of the basic definition of the resource and that modifies the understanding of the element that contains it and/or the understanding of the containing element's descendants. Usually modifier elements provide negation or qualification. To make the use of extensions safe and manageable, there is a strict set of governance applied to the definition and use of extensions. Though any implementer is allowed to define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension. Applications processing a resource are required to check for modifier extensions.  Modifier extensions SHALL NOT change the meaning of any elements on Resource or DomainResource (including cannot change the meaning of modifierExtension itself).",
		},
		identifier: {
			type: new GraphQLList(require('./identifier.schema.js')),
			description:
				'Business identifier for the marketing authorization, as assigned by a regulator.',
		},
		subject: {
			type: new GraphQLUnionType({
				name: 'MedicinalProductAuthorizationsubject_subject_Union',
				description: 'The medicinal product that is being authorized.',
				types: () => [
					require('./medicinalproduct.schema.js'),
					require('./medicinalproductpackaged.schema.js'),
				],
				resolveType(data) {
					if (data && data.resourceType === 'MedicinalProduct') {
						return require('./medicinalproduct.schema.js');
					}
					if (data && data.resourceType === 'MedicinalProductPackaged') {
						return require('./medicinalproductpackaged.schema.js');
					}
				},
			}),
			description: 'The medicinal product that is being authorized.',
		},
		country: {
			type: new GraphQLList(require('./codeableconcept.schema.js')),
			description:
				'The country in which the marketing authorization has been granted.',
		},
		jurisdiction: {
			type: new GraphQLList(require('./codeableconcept.schema.js')),
			description: 'Jurisdiction within a country.',
		},
		status: {
			type: require('./codeableconcept.schema.js'),
			description: 'The status of the marketing authorization.',
		},
		_statusDate: {
			type: require('./element.schema.js'),
			description: 'The date at which the given status has become applicable.',
		},
		statusDate: {
			type: DateTimeScalar,
			description: 'The date at which the given status has become applicable.',
		},
		_restoreDate: {
			type: require('./element.schema.js'),
			description:
				'The date when a suspended the marketing or the marketing authorization of the product is anticipated to be restored.',
		},
		restoreDate: {
			type: DateTimeScalar,
			description:
				'The date when a suspended the marketing or the marketing authorization of the product is anticipated to be restored.',
		},
		validityPeriod: {
			type: require('./period.schema.js'),
			description:
				'The beginning of the time period in which the marketing authorization is in the specific status shall be specified A complete date consisting of day, month and year shall be specified using the ISO 8601 date format.',
		},
		dataExclusivityPeriod: {
			type: require('./period.schema.js'),
			description:
				'A period of time after authorization before generic product applicatiosn can be submitted.',
		},
		_dateOfFirstAuthorization: {
			type: require('./element.schema.js'),
			description:
				'The date when the first authorization was granted by a Medicines Regulatory Agency.',
		},
		dateOfFirstAuthorization: {
			type: DateTimeScalar,
			description:
				'The date when the first authorization was granted by a Medicines Regulatory Agency.',
		},
		_internationalBirthDate: {
			type: require('./element.schema.js'),
			description:
				"Date of first marketing authorization for a company's new medicinal product in any country in the World.",
		},
		internationalBirthDate: {
			type: DateTimeScalar,
			description:
				"Date of first marketing authorization for a company's new medicinal product in any country in the World.",
		},
		legalBasis: {
			type: require('./codeableconcept.schema.js'),
			description:
				'The legal framework against which this authorization is granted.',
		},
		jurisdictionalAuthorization: {
			type: new GraphQLList(
				require('./medicinalproductauthorizationjurisdictionalauthorization.schema.js'),
			),
			description: 'Authorization in areas within a country.',
		},
		holder: {
			type: new GraphQLUnionType({
				name: 'MedicinalProductAuthorizationholder_holder_Union',
				description: 'Marketing Authorization Holder.',
				types: () => [require('./organization.schema.js')],
				resolveType(data) {
					if (data && data.resourceType === 'Organization') {
						return require('./organization.schema.js');
					}
				},
			}),
			description: 'Marketing Authorization Holder.',
		},
		regulator: {
			type: new GraphQLUnionType({
				name: 'MedicinalProductAuthorizationregulator_regulator_Union',
				description: 'Medicines Regulatory Agency.',
				types: () => [require('./organization.schema.js')],
				resolveType(data) {
					if (data && data.resourceType === 'Organization') {
						return require('./organization.schema.js');
					}
				},
			}),
			description: 'Medicines Regulatory Agency.',
		},
		procedure: {
			type: require('./medicinalproductauthorizationprocedure.schema.js'),
			description:
				'The regulatory procedure for granting or amending a marketing authorization.',
		},
	}),
});
