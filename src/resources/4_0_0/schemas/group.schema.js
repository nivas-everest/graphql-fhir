const {
	GraphQLNonNull,
	GraphQLEnumType,
	GraphQLList,
	GraphQLUnionType,
	GraphQLBoolean,
	GraphQLString,
	GraphQLObjectType,
} = require('graphql');
const IdScalar = require('../scalars/id.scalar.js');
const UriScalar = require('../scalars/uri.scalar.js');
const CodeScalar = require('../scalars/code.scalar.js');
const UnsignedIntScalar = require('../scalars/unsignedint.scalar.js');

/**
 * @name exports
 * @summary Group Schema
 */
module.exports = new GraphQLObjectType({
	name: 'Group',
	description:
		"Represents a defined collection of entities that may be discussed or acted upon collectively but which are not expected to act collectively, and are not formally or legally recognized; i.e. a collection of entities that isn't an Organization.",
	fields: () => ({
		resourceType: {
			type: new GraphQLNonNull(
				new GraphQLEnumType({
					name: 'Group_Enum_schema',
					values: { Group: { value: 'Group' } },
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
			description: 'A unique business identifier for this group.',
		},
		_active: {
			type: require('./element.schema.js'),
			description:
				'Indicates whether the record for the group is available for use or is merely being retained for historical purposes.',
		},
		active: {
			type: GraphQLBoolean,
			description:
				'Indicates whether the record for the group is available for use or is merely being retained for historical purposes.',
		},
		_type: {
			type: require('./element.schema.js'),
			description:
				'Identifies the broad classification of the kind of resources the group includes.',
		},
		type: {
			type: new GraphQLNonNull(CodeScalar),
			description:
				'Identifies the broad classification of the kind of resources the group includes.',
		},
		_actual: {
			type: require('./element.schema.js'),
			description:
				'If true, indicates that the resource refers to a specific group of real individuals.  If false, the group defines a set of intended individuals.',
		},
		actual: {
			type: new GraphQLNonNull(GraphQLBoolean),
			description:
				'If true, indicates that the resource refers to a specific group of real individuals.  If false, the group defines a set of intended individuals.',
		},
		code: {
			type: require('./codeableconcept.schema.js'),
			description:
				"Provides a specific type of resource the group includes; e.g. 'cow', 'syringe', etc.",
		},
		_name: {
			type: require('./element.schema.js'),
			description:
				'A label assigned to the group for human identification and communication.',
		},
		name: {
			type: GraphQLString,
			description:
				'A label assigned to the group for human identification and communication.',
		},
		_quantity: {
			type: require('./element.schema.js'),
			description:
				'A count of the number of resource instances that are part of the group.',
		},
		quantity: {
			type: UnsignedIntScalar,
			description:
				'A count of the number of resource instances that are part of the group.',
		},
		managingEntity: {
			type: new GraphQLUnionType({
				name: 'GroupmanagingEntity_managingEntity_Union',
				description:
					'Entity responsible for defining and maintaining Group characteristics and/or registered members.',
				types: () => [
					require('./organization.schema.js'),
					require('./relatedperson.schema.js'),
					require('./practitioner.schema.js'),
					require('./practitionerrole.schema.js'),
				],
				resolveType(data) {
					if (data && data.resourceType === 'Organization') {
						return require('./organization.schema.js');
					}
					if (data && data.resourceType === 'RelatedPerson') {
						return require('./relatedperson.schema.js');
					}
					if (data && data.resourceType === 'Practitioner') {
						return require('./practitioner.schema.js');
					}
					if (data && data.resourceType === 'PractitionerRole') {
						return require('./practitionerrole.schema.js');
					}
				},
			}),
			description:
				'Entity responsible for defining and maintaining Group characteristics and/or registered members.',
		},
		characteristic: {
			type: new GraphQLList(require('./groupcharacteristic.schema.js')),
			description:
				'Identifies traits whose presence r absence is shared by members of the group.',
		},
		member: {
			type: new GraphQLList(require('./groupmember.schema.js')),
			description:
				'Identifies the resource instances that are members of the group.',
		},
	}),
});
