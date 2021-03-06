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

/**
 * @name exports
 * @summary Flag Schema
 */
module.exports = new GraphQLObjectType({
	name: 'Flag',
	description: 'Base StructureDefinition for Flag Resource',
	fields: () => ({
		resourceType: {
			type: new GraphQLNonNull(
				new GraphQLEnumType({
					name: 'Flag_Enum_schema',
					values: { Flag: { value: 'Flag' } },
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
				'The metadata about the resource. This is content that is maintained by the infrastructure. Changes to the content may not always be associated with version changes to the resource.',
		},
		_implicitRules: {
			type: require('./element.schema.js'),
			description:
				'A reference to a set of rules that were followed when the resource was constructed, and which must be understood when processing the content.',
		},
		implicitRules: {
			type: UriScalar,
			description:
				'A reference to a set of rules that were followed when the resource was constructed, and which must be understood when processing the content.',
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
				"A human-readable narrative that contains a summary of the resource, and may be used to represent the content of the resource to a human. The narrative need not encode all the structured data, but is required to contain sufficient detail to make it 'clinically safe' for a human to just read the narrative. Resource definitions may define what content should be represented in the narrative to ensure clinical safety.",
		},
		contained: {
			type: new GraphQLList(require('./resourcelist.schema')),
			description:
				'These resources do not have an independent existence apart from the resource that contains them - they cannot be identified independently, and nor can they have their own independent transaction scope.',
		},
		extension: {
			type: new GraphQLList(require('./extension.schema.js')),
			description:
				'May be used to represent additional information that is not part of the basic definition of the resource. In order to make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer is allowed to define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.',
		},
		modifierExtension: {
			type: new GraphQLList(require('./extension.schema.js')),
			description:
				'May be used to represent additional information that is not part of the basic definition of the resource, and that modifies the understanding of the element that contains it. Usually modifier elements provide negation or qualification. In order to make the use of extensions safe and manageable, there is a strict set of governance applied to the definition and use of extensions. Though any implementer is allowed to define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension. Applications processing a resource are required to check for modifier extensions.',
		},
		identifier: {
			type: new GraphQLList(require('./identifier.schema.js')),
			description:
				'Identifier assigned to the flag for external use (outside the FHIR environment).',
		},
		// valueSetReference: http://hl7.org/fhir/ValueSet/flag-category
		category: {
			type: require('./codeableconcept.schema.js'),
			description:
				'Allows an flag to be divided into different categories like clinical, administrative etc. Intended to be used as a means of filtering which flags are displayed to particular user or in a given context.',
		},
		_status: {
			type: require('./element.schema.js'),
			description: 'Supports basic workflow.',
		},
		// valueSetReference: http://hl7.org/fhir/ValueSet/flag-status
		status: {
			type: new GraphQLNonNull(CodeScalar),
			description: 'Supports basic workflow.',
		},
		period: {
			type: require('./period.schema.js'),
			description:
				'The period of time from the activation of the flag to inactivation of the flag. If the flag is active, the end of the period should be unspecified.',
		},
		subject: {
			type: new GraphQLNonNull(
				new GraphQLUnionType({
					name: 'Flagsubject_subject_Union',
					description:
						'The patient, location, group , organization , or practitioner this is about record this flag is associated with.',
					types: () => [
						require('./patient.schema.js'),
						require('./location.schema.js'),
						require('./group.schema.js'),
						require('./organization.schema.js'),
						require('./practitioner.schema.js'),
					],
					resolveType(data) {
						if (data && data.resourceType === 'Patient') {
							return require('./patient.schema.js');
						}
						if (data && data.resourceType === 'Location') {
							return require('./location.schema.js');
						}
						if (data && data.resourceType === 'Group') {
							return require('./group.schema.js');
						}
						if (data && data.resourceType === 'Organization') {
							return require('./organization.schema.js');
						}
						if (data && data.resourceType === 'Practitioner') {
							return require('./practitioner.schema.js');
						}
					},
				}),
			),
			description:
				'The patient, location, group , organization , or practitioner this is about record this flag is associated with.',
		},
		encounter: {
			type: new GraphQLUnionType({
				name: 'Flagencounter_encounter_Union',
				description: 'This alert is only relevant during the encounter.',
				types: () => [require('./encounter.schema.js')],
				resolveType(data) {
					if (data && data.resourceType === 'Encounter') {
						return require('./encounter.schema.js');
					}
				},
			}),
			description: 'This alert is only relevant during the encounter.',
		},
		author: {
			type: new GraphQLUnionType({
				name: 'Flagauthor_author_Union',
				description:
					'The person, organization or device that created the flag.',
				types: () => [
					require('./device.schema.js'),
					require('./organization.schema.js'),
					require('./patient.schema.js'),
					require('./practitioner.schema.js'),
				],
				resolveType(data) {
					if (data && data.resourceType === 'Device') {
						return require('./device.schema.js');
					}
					if (data && data.resourceType === 'Organization') {
						return require('./organization.schema.js');
					}
					if (data && data.resourceType === 'Patient') {
						return require('./patient.schema.js');
					}
					if (data && data.resourceType === 'Practitioner') {
						return require('./practitioner.schema.js');
					}
				},
			}),
			description: 'The person, organization or device that created the flag.',
		},
		// valueSetReference: http://hl7.org/fhir/ValueSet/flag-code
		code: {
			type: new GraphQLNonNull(require('./codeableconcept.schema.js')),
			description:
				'The coded value or textual component of the flag to display to the user.',
		},
	}),
});
